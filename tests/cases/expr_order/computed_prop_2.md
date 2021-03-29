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
const tmpSSA_a = $(1);
const tmpSSA_c = $(2);
const tmpCompProp = $(tmpSSA_c);
tmpSSA_a[tmpCompProp];
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
