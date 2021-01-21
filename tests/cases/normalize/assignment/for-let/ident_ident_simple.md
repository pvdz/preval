# Preval test case

# ident_ident_simple.md

> normalize > assignment > for-let > ident_ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
for (let wat = a = b = c; false;);
$(wat);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
{
  b = c;
  a = c;
  let wat_1 = a;
  while (false) {}
}
$(wat_1);
$(a, b, c);
`````

## Output

`````js filename=intro
let a = 1;
let b = 2;
b = 3;
a = 3;
let wat_1 = a;
while (false) {}
$(wat_1);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not defined ]>

Normalized calls: Same

Final output calls: BAD!!
[[3], [3, 3, 3], null];

