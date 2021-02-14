# Preval test case

# computed_prop.md

> expr_order > computed_prop
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

## Normalized

`````js filename=intro
var a;
var b;
var c;
a = $(1);
b = a;
c = $(2);
const tmpCompObj = b;
const tmpCompProp = $(c);
tmpCompObj[tmpCompProp];
`````

## Output

`````js filename=intro
var a;
var b;
var c;
a = $(1);
b = a;
c = $(2);
const tmpCompObj = b;
const tmpCompProp = $(c);
tmpCompObj[tmpCompProp];
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
