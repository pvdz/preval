# Preval test case

# label_registry.md

> Tofix > Label registry
>
> Remove this file after fixing it but the label registry needs a fixup
> Why is the label still not eliminated here...?

## Input

`````js filename=intro
$(0);
foo: for(;$(true);) {
  if (1) break foo;
  else continue foo;
}
$(2);
`````

## Pre Normal


`````js filename=intro
$(0);
foo: {
  while ($(true)) {
    {
      $continue: {
        {
          if (1) break foo;
          else break $continue;
        }
      }
    }
  }
}
$(2);
`````

## Normalized


`````js filename=intro
$(0);
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $continue: {
      break;
    }
  } else {
    break;
  }
}
$(2);
`````

## Output


`````js filename=intro
$(0);
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $continue: {
      break;
    }
  } else {
    break;
  }
}
$(2);
`````

## PST Output

With rename=true

`````js filename=intro
$( 0 );
while (true) {
  const a = $( true );
  if (a) {
    $continue:     {
      break;
    }
  }
  else {
    break;
  }
}
$( 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: true
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
