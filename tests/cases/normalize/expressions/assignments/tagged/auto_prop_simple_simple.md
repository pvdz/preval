# Preval test case

# auto_prop_simple_simple.md

> Normalize > Expressions > Assignments > Tagged > Auto prop simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = { b: $(1) })} after`;
a.b = 2;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = { b: $(1) }));
a.b = 2;
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
a.b = 2;
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = [`before `, ` after`];
const tmpObjLitVal = $(1);
const a = { b: tmpObjLitVal };
$(tmpCalleeParam, a);
a.b = 2;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "before ", " after" ];
const b = $( 1 );
const c = { b: b };
$( a, c );
c.b = 2;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: ['before ', ' after'], { b: '1' }
 - 3: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
