# Preval test case

# sequence-simple.md

> normalize > assignment > for-b > sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 0;
for (;(a, b).c = d;);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 0;
{
  while (true) {
    {
      {
        a;
        b.c = d;
      }
      let ifTestTmp = d;
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
  b.c = 0;
  break;
}
$(1, b, 'unused', 0);
`````

## Result

Should call `$` with:
 - 0: 1,{"c":0},"unused",0
 - 1: undefined

Normalized calls: Same

Final output calls: Same
