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
var tmpComputedObj;
var tmpComputedProp;
{
  a = $(1);
  b = a;
  c = $(2);
  {
    tmpComputedObj = b;
    tmpComputedProp = $(c);
    tmpComputedObj[tmpComputedProp];
  }
}
`````

## Output

`````js filename=intro
var a;
var b;
var c;
var tmpComputedObj;
var tmpComputedProp;
a = $(1);
b = a;
c = $(2);
tmpComputedObj = b;
tmpComputedProp = $(c);
tmpComputedObj[tmpComputedProp];
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: 2
 - 3: undefined

Normalized calls: Same

Final output calls: Same
