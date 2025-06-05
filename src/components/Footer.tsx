import React from "react";

const GitHubIcon = () => (
  <svg className="w-5 h-5 mr-1 inline-block align-text-bottom" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.606-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.984-.399 3.003-.404 1.018.005 2.046.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.299 24 12c0-6.627-5.373-12-12-12z"/></svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5 mr-1 inline-block align-text-bottom" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.966 0-1.75-.79-1.75-1.76s.784-1.76 1.75-1.76 1.75.79 1.75 1.76-.784 1.76-1.75 1.76zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z"/></svg>
);

const Footer: React.FC = () => {
    return (
        <footer className="text-gray-900 text-center py-4 shadow-[0px_-4px_6px_-1px_rgba(0,0,0,.1)]">
            <div className="container mx-auto flex flex-col items-center space-y-2">
                <span className="text-sm">&copy; {new Date().getFullYear()} Kerry Powell. All rights reserved.</span>
                <div className="flex space-x-4">
                    <a href="https://github.com/powellkerry" target="_blank" rel="noopener noreferrer" className="hover:text-amber-900 transition-colors flex items-center">
                        <GithubIcon />GitHub
                    </a>
                    <a href="https://linkedin.com/in/kerry-w-powell" target="_blank" rel="noopener noreferrer" className="hover:text-amber-900 transition-colors flex items-center">
                        <LinkedInIcon />LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;