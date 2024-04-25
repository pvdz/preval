# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Statement > Arr spread > Auto base assign ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
[...(b = $(2))];
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
[...(b = $(2))];
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
b = $(2);
let tmpArrElToSpread = b;
[...tmpArrElToSpread];
$(a, b);
`````

## Output

`````js filename=intro
const b = $(2);
[...b];
const a = { a: 999, b: 1000 };
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
[ ... a ];
const b = {
a: 999,
b: 1000
;
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
