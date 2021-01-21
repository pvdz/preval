# Preval test case

# sequence-simple-sequence-simple.md

> normalize > assignment > for-b > sequence-simple-sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 0;
for (;(a, b).c = (a, b).c = d;);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { c: 2 };
let d = 0;
{
  while (true) {
    {
      a;
      let tmpBindInitMemberObject = b;
      {
        a;
        b.c = d;
      }
      let tmpBindInitRhs = d;
      tmpBindInitMemberObject.c = tmpBindInitRhs;
      let ifTestTmp = tmpBindInitRhs;
      if (ifTestTmp) {
      } else {
        break;
      }
    }
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
let b = { c: 2 };
while (true) {
  let tmpBindInitMemberObject = b;
  b.c = 0;
  tmpBindInitMemberObject.c = 0;
  break;
}
$(1, b, c, 0);
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not defined ]>

Normalized calls: Same

Final output calls: Same
