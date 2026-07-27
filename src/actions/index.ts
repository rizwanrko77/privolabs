import { defineAction } from 'astro:actions';
import { z } from 'zod';

export const server = {
  contact: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string().min(2).max(80),
      email: z.string().email(),
      company: z.string().max(120).nullable().optional(),
      projectType: z.enum(['web', 'android', 'ios', 'ai', 'cloud', 'other']).nullable().optional(),
      subject: z.string().max(120).nullable().optional(),
      message: z.string().min(20).max(4000),
      budget: z.enum(['<25k','25-75k','75-200k','200k+','unsure']).nullable().optional(),
      timeline: z.enum(['asap','1-3mo','3-6mo','exploring']).nullable().optional(),
      website: z.string().max(0).nullable().optional(), // honeypot
    }),
    handler: async (input) => {
      try {
        const webhookUrl = import.meta.env.GOOGLE_APPS_SCRIPT_URL;
        
        if (!webhookUrl) {
          throw new Error('Google Apps Script URL is not configured.');
        }

        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(input)
        });

        const result = await response.json();
        
        if (!result.success) {
          throw new Error(result.error || 'Failed to save to Google Sheets');
        }

        return {
          success: true,
          message: "Thank you. We'll be in touch shortly."
        };
      } catch (error) {
        console.error('Contact form submission error:', error);
        throw new Error('Failed to submit form. Please try again later.');
      }
    }
  })
};
