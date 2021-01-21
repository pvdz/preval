# Preval test case

# sequence-simple.md

> normalize > assignment > for-of-right > sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
for (let x of ((a, b).c = d));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
{
  let tmpForOfLhsDecl;
  {
    {
      a;
      b.c = d;
    }
    const tmpForOfRhs = d;
    for (tmpForOfLhsDecl of tmpForOfRhs) {
      let x = tmpForOfLhsDecl;
    }
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
let b = { c: 2 };
let tmpForOfLhsDecl;
b.c = 3;
for (tmpForOfLhsDecl of 3) {
}
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
