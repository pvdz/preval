# Preval test case

# block1.md

> Normalize > Dce > Break > Block1
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
while ($(true)) {
  {
    break;
  }
  $('fail');
}
$('after');
`````

## Normalized

`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    break;
  } else {
    break;
  }
}
$('after');
`````

## Output

`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    break;
  } else {
    break;
  }
}
$('after');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'after'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
