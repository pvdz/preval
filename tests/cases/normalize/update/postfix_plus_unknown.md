# Preval test case

# postfix_plus_unknown.md

> Normalize > Update > Postfix plus unknown
>
> Update expressions should be transformed to regular binary expression assignments

#TODO

## Input

`````js filename=intro
let x = $(1);
$(x++);
`````

## Pre Normal

`````js filename=intro
let x = $(1);
$(x++);
`````

## Normalized

`````js filename=intro
let x = $(1);
const tmpCallCallee = $;
const tmpPostUpdArgIdent = x;
x = x + 1;
const tmpCalleeParam = tmpPostUpdArgIdent;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
let x = $(1);
const tmpPostUpdArgIdent = x;
x = x + 1;
$(tmpPostUpdArgIdent);
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( 1 );
const b = a;
a = a + 1;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
