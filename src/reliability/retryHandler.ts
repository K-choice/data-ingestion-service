export const retryHandler = async (operation: () => Promise<any>, retries: number = 3, delay: number = 1000): Promise<any> => {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            return await operation();
        } catch (error) {
            console.error(`Attempt ${attempt} failed: ${error.message}`);
            if (attempt < retries) {
                await new Promise(res => setTimeout(res, delay));
            } else {
                throw new Error(`Operation failed after ${retries} attempts: ${error.message}`);
            }
        }
    }
};