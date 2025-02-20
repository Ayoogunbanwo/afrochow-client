import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation'; // Import useRouter

export function useLogin(login) {
  const router = useRouter(); // Initialize useRouter

  const mutation = useMutation({
    mutationFn: async (data) => {
      const { email, password } = data;
      await login(email, password); // Call the login function from AuthContext
    },
    onError: (error) => {
      console.error("Error during login mutation:", error);
      throw new Error("Login failed. Please try again.");
    },
    onSuccess: () => {

    },
  });

  return mutation;
}
