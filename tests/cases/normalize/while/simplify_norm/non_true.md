# Preval test case

# non_true.md

> Normalize > While > Simplify norm > Non true
>
> Try to undo some of the damage that was necessary during loop normalizations

#TODO

## Input

`````js filename=intro
while (x) {
  const tmpIfTest = $('yes');
  if (tmpIfTest) {
  } else {
    break;
  }
}
`````

## Pre Normal

`````js filename=intro
while (x) {
  const tmpIfTest = $(`yes`);
  if (tmpIfTest) {
  } else {
    break;
  }
}
`````

## Normalized

`````js filename=intro
while (x) {
  const tmpIfTest = $(`yes`);
  if (tmpIfTest) {
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
while (x) {
  const tmpIfTest = $(`yes`);
  if (tmpIfTest) {
  } else {
    break;
  }
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
