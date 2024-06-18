# Preval test case

# redundant_continue_label.md

> Labels > Redundant continue label
>
> The label is redundant because the continue does not span more than one loop. So it may as well not have had the label.

## Input

`````js filename=intro
foo: do {
  $(1);
  continue foo;
} while (false);
`````

## Pre Normal


`````js filename=intro
foo: while (true) {
  {
    $continue: {
      {
        $(1);
        break $continue;
      }
    }
  }
  if (false) {
  } else {
    break;
  }
}
`````

## Normalized


`````js filename=intro
$(1);
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
