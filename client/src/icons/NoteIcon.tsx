interface Props {
  className: string;
}

const NoteIcon: React.FC<Props> = (props) => {
  return (
    <svg
      viewBox="0 0 21 21"
      strokeWidth={1.5}
      fill="currentColor"
      className={props.className}
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6.5 3.5h8a2 2 0 012 2v10a2 2 0 01-2 2h-8a2 2 0 01-2-2v-10a2 2 0 012-2zM7.5 17.5v-14" />
      </g>
    </svg>
  );
};

export default NoteIcon;
