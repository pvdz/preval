# Preval test case

# auto_ident_tagged_simple.md

> Normalize > Expressions > Statement > Switch w default case block > Auto ident tagged simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = $`fo${1}o`;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = $([`fo`, `o`], 1);
$(a);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = [`fo`, `o`];
const tmpCalleeParam$1 = 1;
let a = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = [`fo`, `o`];
const a = $(tmpCalleeParam, 1);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "fo", "o",, ];
const b = $( a, 1 );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['fo', 'o'], 1
 - 2: ['fo', 'o']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
