# Preval test case

# for.md

> Labels > For
>
> If the sub-statement of a label is a loop then it should not become a block since that would be a syntax error with labeled continue.

#TODO

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
let tmpIfTest = $(true);
while (true) {
  if (tmpIfTest) {
    $continue: {
      break;
    }
    tmpIfTest = $(true);
  } else {
    break;
  }
}
$(2);
`````

## Output

`````js filename=intro
$(0);
let tmpIfTest = $(true);
while (true) {
  if (tmpIfTest) {
    $continue: {
      break;
    }
    tmpIfTest = $(true);
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
let a = $( true );
while (true) {
  if (a) {
    $continue:     {
      break;
    }
    a = $( true );
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
