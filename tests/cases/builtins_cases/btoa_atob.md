# Preval test case

# btoa_atob.md

> Builtins cases > Btoa atob
>
> built-in for nodejs

## Input

`````js filename=intro
$(atob(btoa("isn't encoding fun?")));
`````

## Pre Normal


`````js filename=intro
$(atob(btoa(`isn't encoding fun?`)));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCallCallee$1 = atob;
const tmpCalleeParam$1 = `aXNuJ3QgZW5jb2RpbmcgZnVuPw==`;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`isn't encoding fun?`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "isn't encoding fun?" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: "isn't encoding fun?"
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
