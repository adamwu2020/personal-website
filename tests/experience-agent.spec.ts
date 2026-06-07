import path from 'path';
import { test, expect } from '@playwright/test';

const fileUrl = `file://${path.resolve(__dirname, '..', 'index.html')}`;

test.describe('Experience Agent', () => {
    test('responds to a typed GE HealthCare question', async ({ page }) => {
        await page.goto(fileUrl);

        const input = page.getByPlaceholder(/Ask about Lei's experience/i);
        await input.fill('What did you build at GE HealthCare?');
        await page.getByRole('button', { name: 'Ask' }).click();

        const response = page
            .locator('#agentMessages .agent-message-agent')
            .filter({ hasText: 'GE HealthCare' })
            .last();
        await expect(response).toBeVisible({ timeout: 7000 });
    });

    test('suggestion chips submit preset question', async ({ page }) => {
        await page.goto(fileUrl);

        await page.getByRole('button', { name: 'GE HealthCare foundation models' }).click();

        const latestUserMessage = page.locator('#agentMessages .agent-message-user').last();
        await expect(latestUserMessage).toContainText('What did you build at GE HealthCare?');

        const latestAgentMessage = page
            .locator('#agentMessages .agent-message-agent')
            .filter({ hasText: 'GE HealthCare' })
            .last();
        await expect(latestAgentMessage).toBeVisible({ timeout: 7000 });
    });
});
