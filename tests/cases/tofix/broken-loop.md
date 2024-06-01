# Preval test case

# broken-loop.md

> Tofix > Broken-loop
>
> A loop where the body unconditionally breaks is not a loop

#TODO

## Input

`````js filename=intro
// If a while(true) body ends with a break, and it does not 
// continue anywhere else, then the while(true) can be dropped, right...
let x = 1;
$(x);
A: {
  while (true) {
    $finally: {
      try {
        $(x);   // x=1 (while does not loop)
        x = 2;
        break $finally;
      } catch (_) {
      }
    }
    $(x);
    x = 3;
    break A;
  }
  $(x);    // unreachable
  x = 4;   // unreachable
}
$(x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
$(x);
A: {
  while (true) {
    $finally: {
      try {
        $(x);
        x = 2;
        break $finally;
      } catch (_) {}
    }
    $(x);
    x = 3;
    break A;
  }
  $(x);
  x = 4;
}
$(x);
`````

## Normalized

`````js filename=intro
let x = 1;
$(x);
A: {
  while (true) {
    $finally: {
      try {
        $(x);
        x = 2;
        break $finally;
      } catch (_) {}
    }
    $(x);
    x = 3;
    break A;
  }
  $(x);
  x = 4;
}
$(x);
`````

## Output

`````js filename=intro
let x = 1;
$(1);
A: {
  while (true) {
    try {
      $(x);
      x = 2;
    } catch (_) {}
    $(x);
    x = 3;
    break A;
  }
  $(x);
  x = 4;
}
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
$( 1 );
A: {
  while (true) {
    try {
      $( a );
      a = 2;
    }
catch (b) {

    }
    $( a );
    a = 3;
    break A;
  }
  $( a );
  a = 4;
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
