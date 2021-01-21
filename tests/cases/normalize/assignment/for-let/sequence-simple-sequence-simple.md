# Preval test case

# sequence-simple-sequence-simple.md

> normalize > assignment > for-let > sequence-simple-sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
for (let wat = (a, b).c = (a, b).c = d; false;);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
{
  a;
  let tmpBindInitMemberObject = b;
  {
    a;
    b.c = d;
  }
  let tmpBindInitRhs = d;
  tmpBindInitMemberObject.c = tmpBindInitRhs;
  let wat = tmpBindInitRhs;
  while (false) {}
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
let b = { c: 2 };
let tmpBindInitMemberObject = b;
b.c = 3;
tmpBindInitMemberObject.c = 3;
while (false) {}
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: 1,{"c":3},"unused",3
 - 1: undefined

Normalized calls: Same

Final output calls: Same
