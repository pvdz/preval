# Preval test case

# auto_ident_tagged_trivial.md

> Normalize > Expressions > Statement > For c > Auto ident tagged trivial
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = $`foo`;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = $([`foo`]);
$(a);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = [`foo`];
let a = tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = [`foo`];
const a = $(tmpCalleeParam);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "foo" ];
const b = $( a );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['foo']
 - 2: ['foo']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
