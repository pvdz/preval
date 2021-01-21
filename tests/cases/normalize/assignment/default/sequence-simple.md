# Preval test case

# sequence-simple.md

> normalize > assignment > default > sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
switch ($('a')) { default: (a, b).c = d; }
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
{
  const tmpSwitchTest = $('a');
  {
    let tmpFallthrough = false;
    {
      ('default case:');
      {
        a;
        b.c = d;
      }
    }
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
let b = { c: 2 };
$('a');
b.c = 3;
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: "a"
 - 1: 1,{"c":3},"unused",3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
