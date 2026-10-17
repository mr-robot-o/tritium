# Git workflow rules

- Never create branches (or worktrees) when editing code. Work directly in the current checkout, even for large changes.
- Never run `git commit`, `git push`, `git branch`, `git checkout -b`, `git switch -c`, or any other command that creates commits or branches. The user handles all of that.
- After finishing a change, provide a proper commit message for the user to use, in the format below. Output it only; do not run it.

## Commit message format

```
<type>: <short imperative summary in lowercase>
```

- `<type>` is a conventional-commit type: `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`.
- No scope; the summary is a single line describing what changed and, where useful, why.
