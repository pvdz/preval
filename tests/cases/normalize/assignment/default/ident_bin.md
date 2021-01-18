# Preval test case

# ident_bin.md

> normalize > assignment > default > ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
switch ($('a')) { default: a = b + c; }
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
{
  const tmpSwitchTest = $('a');
  {
    let tmpFallthrough = false;
    {
      ('default case:');
      a = b + c;
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
let a = 1;
$('a');
a = 5;
$(a, 5, 3);
`````

## Result

Should call `$` with:
[['a'], [5, 2, 3], null];

Normalized calls: Same

Final output calls: BAD!!
[['a'], [5, 5, 3], null];

