<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Shared public website layout and content sections live in `src/components/site.tsx`; content routes compose them to keep navigation, contact details and visual presentation consistent.
- Reference photographs are imported through `.asset.json` pointers; this keeps original media on the asset service rather than in the repository.
- Render the supplied brand logo through the shared site layout and derive the browser favicon from that asset to keep brand identity consistent across pages.
