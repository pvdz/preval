# Preval test case

# redundant_continue_label.md

> Labels > Redundant continue label
>
> The label is redundant because the continue does not span more than one loop. So it may as well not have had the label.

#TODO

## Input

`````js filename=intro
foo: do {
  $(1);
  continue foo;
} while (false);
`````

## Pre Normal

`````js filename=intro
dropme: {
  let tmpDoWhileFlag = true;
  foo: while (tmpDoWhileFlag || false) {
    tmpDoWhileFlag = false;
    $continue: {
      {
        $(1);
        break $continue;
      }
    }
  }
}
`````

## Normalized

`````js filename=intro
let tmpDoWhileFlag = true;
while (true) {
  let tmpIfTest = tmpDoWhileFlag;
  if (tmpIfTest) {
  } else {
    tmpIfTest = false;
  }
  if (tmpIfTest) {
    tmpDoWhileFlag = false;
    $continue: {
      $(1);
      break $continue;
    }
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
