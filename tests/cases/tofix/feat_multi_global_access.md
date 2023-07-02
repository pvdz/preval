# Preval test case

# feat_multi_global_access.md

> Tofix > Feat multi global access
>
> Writing to an implicit global

accessing a global as a statement (for crash retention) can be eliminated when there's a guaranteed previous read or write to that same binding
if the binding is guaranteed to be accessed next, without observable side effects, then that's fine too (a; const x = a + 1;)

existing test

## Input

`````js filename=intro
$(a = 5);
`````

## Pre Normal

`````js filename=intro
$((a = 5));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
a = 5;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
a = 5;
a;
$(a);
`````

## Globals

BAD@! Found 1 implicit global bindings:

a

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
