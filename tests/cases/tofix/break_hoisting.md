# Preval test case

# break_hoisting.md

> Tofix > Break hoisting
>
> If, in this case, the $(3) is hoisted to right before the unlabeled break
> then the labeled break could become a regular break too and the label 
> becomes unused. This works for any size as long as there's a single break
> and I'm not sure about multiple unlabeled breaks.
> The number of labeled breaks is irrelevant here because the problem is in
> code bloat.

## Input

`````js filename=intro
a: {
  while (true) {
    if ($(0)) {
      $(1);
      break;
    }
    else {
      $(2);
      break a;
    }
  }
  $(3); // Move this to after $(1) then the label can be dropped
}
`````

## Pre Normal


`````js filename=intro
a: {
  while (true) {
    if ($(0)) {
      $(1);
      break;
    } else {
      $(2);
      break a;
    }
  }
  $(3);
}
`````

## Normalized


`````js filename=intro
a: {
  while (true) {
    const tmpIfTest = $(0);
    if (tmpIfTest) {
      $(1);
      break;
    } else {
      $(2);
      break a;
    }
  }
  $(3);
}
`````

## Output


`````js filename=intro
a: {
  while (true) {
    const tmpIfTest = $(0);
    if (tmpIfTest) {
      $(1);
      break;
    } else {
      $(2);
      break a;
    }
  }
  $(3);
}
`````

## PST Output

With rename=true

`````js filename=intro
a: {
  while (true) {
    const a = $( 0 );
    if (a) {
      $( 1 );
      break;
    }
    else {
      $( 2 );
      break a;
    }
  }
  $( 3 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
