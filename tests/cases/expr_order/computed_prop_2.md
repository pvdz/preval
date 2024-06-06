# Preval test case

# computed_prop_2.md

> Expr order > Computed prop 2
>
> The object is evaluated before the computed property

This was once how the original test case got normalized. I want to make sure this case gets statementified too.

#TODO

## Input

`````js filename=intro
var a;
var b;
var c;
(
  (a = $(1)), 
  (b = a), 
  (c = $(2)), 
  b
)[$(c)];
`````

## Pre Normal


`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
((a = $(1)), (b = a), (c = $(2)), b)[$(c)];
`````

## Normalized


`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
a = $(1);
b = a;
c = $(2);
const tmpCompObj = b;
const tmpCompProp = $(c);
tmpCompObj[tmpCompProp];
`````

## Output


`````js filename=intro
const a = $(1);
const c = $(2);
const tmpCompProp = $(c);
a[tmpCompProp];
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = $( b );
a[ c ];
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
