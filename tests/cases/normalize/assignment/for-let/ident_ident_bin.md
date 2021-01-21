# Preval test case

# ident_ident_bin.md

> normalize > assignment > for-let > ident_ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
for (let wat = a = b = c + d; false;);
$(wat);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
let c = 3;
let d = 4;
{
  tmpNestedComplexRhs = c + d;
  b = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
  let wat_1 = a;
  while (false) {}
}
$(wat_1);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
tmpNestedComplexRhs = 7;
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
let wat_1 = a;
while (false) {}
$(wat_1);
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not defined ]>

Normalized calls: Same

Final output calls: BAD!!
[[7], [7, 7, 7], null];

