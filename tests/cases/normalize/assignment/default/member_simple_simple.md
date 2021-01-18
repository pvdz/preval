# Preval test case

# member_simple_simple.md

> normalize > assignment > default > member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
switch ($('a')) { default: a.x = b; }
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = { x: 10 };
let b = 2;
let c = 3;
{
  const tmpSwitchTest = $('a');
  {
    let tmpFallthrough = false;
    {
      ('default case:');
      a.x = b;
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
let a = { x: 10 };
$('a');
a.x = 2;
$(a, 2, 3);
`````

## Result

Should call `$` with:
[['a'], [{ x: 2 }, 2, 3], null];

Normalized calls: Same

Final output calls: Same
