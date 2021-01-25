# Preval test case

# ident_simple.md

> normalize > assignment > default > ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
switch ($('a')) { default: a = b; }
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
const tmpSwitchTest = $('a');
{
  let tmpFallthrough = false;
  {
    ('default case:');
    a = b;
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
let a = 1;
$('a');
a = 2;
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: "a"
 - 1: 2,2,3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
