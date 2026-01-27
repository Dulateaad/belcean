export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg
        aria-label="BeClean logo"
        className="h-8 w-auto"
        viewBox="0 0 164 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 'B' Icon */}
        <path
          d="M21.5 38C33.3873 38 43 29.3873 43 19.5C43 9.61269 33.3873 1 21.5 1H2C1.44772 1 1 1.44772 1 2V38C1 38.5523 1.44772 39 2 39H21.5C21.5 39 21.5 38 21.5 38Z"
          className="text-primary fill-current"
        />
        <path
          d="M21.5 19.5C32.2843 19.5 41 15.1421 41 10C41 4.85786 32.2843 0.5 21.5 0.5H1V19.5H21.5Z"
          className="text-foreground dark:text-primary-foreground fill-current"
        />
        {/* Sparkles */}
        <path
          d="M12.5 12L14.25 8L16 12L20 13.5L16 15L14.25 19L12.5 15L9 13.5L12.5 12Z"
          className="text-primary"
          fill="currentColor"
        />
        <path
          d="M30 7L31 5L32 7L34 8L32 9L31 11L30 9L28 8L30 7Z"
          className="text-primary"
          fill="currentColor"
        />
        <path
          d="M12.5 28L14.25 24L16 28L20 29.5L16 31L14.25 35L12.5 31L9 29.5L12.5 28Z"
          className="text-foreground dark:text-primary-foreground"
          fill="currentColor"
        />
        {/* Text */}
        <text
          x="54"
          y="30"
          className="font-bold text-[28px] text-foreground dark:text-primary-foreground fill-current"
          style={{ fontFamily: 'Manrope, sans-serif' }}
        >
          Be
        </text>
        <text
          x="96"
          y="30"
          className="font-bold text-[28px] text-primary fill-current"
          style={{ fontFamily: 'Manrope, sans-serif' }}
        >
          Clean
        </text>
      </svg>
    </div>
  );
}
