# Preval test case

# sequence-simple.md

> normalize > assignment > for-in-right > sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
for (let x in ((a, b).c = d));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
{
  {
    a;
    b.c = d;
  }
  const tmpForInDeclRhs = d;
  let x;
  for (x in tmpForInDeclRhs) {
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
let b = { c: 2 };
b.c = 3;
let x;
for (x in 3) {
}
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: 1,{"c":3},"unused",3
 - 1: undefined

Normalized calls: Same

Final output calls: Same
