# Preval test case

# ident_bin.md

> normalize > assignment > for-let > ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
for (let wat = a = b + c; false;);
$(wat);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
{
  a = b + c;
  let wat_1 = a;
  while (false) {}
}
$(wat_1);
$(a, b, c);
`````

## Output

`````js filename=intro
let a = 1;
a = 5;
let wat_1 = a;
while (false) {}
$(wat_1);
$(a, 5, 3);
`````

## Result

Should call `$` with:
['<crash[ <ref> is not defined ]>'];

Normalized calls: Same

Final output calls: BAD!!
[[5], [5, 5, 3], null];

