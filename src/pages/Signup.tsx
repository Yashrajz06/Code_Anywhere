import { Link, useSearchParams } from 'react-router-dom';

const Signup = () => {
    const [searchParams] = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

    const handleLogin = (provider: string) => {
        window.location.href = `/api/auth/signin/${provider}?callbackUrl=${encodeURIComponent(window.location.origin + callbackUrl)}`;
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center p-4 font-display">
            <div className="w-full max-w-[480px]">
                {/* Brand Logo Area */}
                <Link to="/" className="flex flex-col items-center mb-8 hover:opacity-90 transition-opacity">
                    <div className="bg-primary p-2 rounded-lg mb-4">
                        <span className="material-symbols-outlined text-white text-[32px]">code</span>
                    </div>
                    <h2 className="text-xl font-bold text-[#111318] dark:text-white">Code Anywhere</h2>
                </Link>
                {/* Auth Card */}
                <div className="bg-white dark:bg-[#1c222d] rounded-xl shadow-sm border border-[#dbdee6] dark:border-[#2d3648] overflow-hidden">
                    <div className="flex flex-col p-8">
                        {/* HeadlineText */}
                        <h1 className="text-[#111318] dark:text-white tracking-light text-[32px] font-bold leading-tight text-center pb-2">
                            Create Account
                        </h1>
                        {/* BodyText */}
                        <p className="text-[#616e89] dark:text-gray-400 text-base font-normal leading-normal pb-8 text-center">
                            Join thousands of developers building today.
                        </p>

                        {/* Social Logins */}
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={() => handleLogin('github')}
                                className="flex items-center justify-center gap-3 bg-[#24292F] hover:bg-[#24292F]/90 text-white font-bold py-3 px-4 rounded-lg transition-colors w-full"
                                type="button"
                            >
                                <img
                                    alt="GitHub Logo"
                                    className="w-5 h-5 invert"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3O8NDaBOgGQoifN7Be6_8iUNXXXjp7w3vooojvjypZQtrU1ZXE5ln9uJf2bg7LKlTB3fWZd6KJ64oqPW7zjc-zSyx17gTLBfgTbS9SHz1WtVDlwNVQYJV-lYO8TuNC_2-RhNysQrV2IS-B3Yc2lImgWje8iM5SQKxPVHKcuO2CQRXzt4sLdbcWkCT5veuaINHEGCbTm6U817C4b3fpY8kcbSd2L_OvVWqRYCWam2ZScIWveFsiwjUvo0xDkh4RiI7bj-wQAmZmiM"
                                />
                                <span>Sign up with GitHub</span>
                            </button>
                            <button
                                onClick={() => handleLogin('google')}
                                className="flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-[#111318] border border-gray-300 font-bold py-3 px-4 rounded-lg transition-colors w-full"
                                type="button"
                            >
                                <img
                                    alt="Google Logo"
                                    className="w-5 h-5"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqJQ5-g9MgonaKpoHnrpLLVR_vxIiedP8FXebBliqiLtW6wumVHEXcVM6I2L04lW8O8VKf45m9FCh6-tSbgPt88uu7mL2MQjhIwJqUseUfSRnwVaGDWyeQTa0wiXqjC2yyZyQhaZX33KtFDGyKYuW876eZiQ9xZ5aA0zTa_sgmJKE6NJisejnQ8bdn4fDBs47tyKh2YDRKZCqZpfQlUEHWHOxRfMwRRSN4r3bWw1_T9cOYtYItO1q1XWUmKX5_2fh626nd-eVaAoY"
                                />
                                <span>Sign up with Google</span>
                            </button>
                        </div>

                        {/* Login Link */}
                        <div className="mt-8 text-center text-sm text-[#616e89] dark:text-gray-400">
                            Already have an account? <Link to="/login" className="font-medium text-primary hover:underline">Log in</Link>
                        </div>

                        <div className="mt-6 text-center text-sm text-gray-500">
                            By creating an account, you agree to our <a href="#" className="underline hover:text-primary">Terms</a> and <a href="#" className="underline hover:text-primary">Privacy Policy</a>.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
