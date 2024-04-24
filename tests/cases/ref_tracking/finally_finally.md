# Preval test case

# finally_finally.md

> Ref tracking > Finally finally

## Input

`````js filename=intro
let a = 1;
try {
  $(a);
  a = 2;
  try {
    $();
    a = 3;
  } finally {
    $(a);
    a = 4;
  }
} catch {
  $(a); // might observe 1, 2, 3, and 4
  a = 5;
} finally {
  $(a); // same, inc and despite the catch write, so might also see 5
}
$(a);
`````

## Pre Normal

`````js filename=intro
let a = 1;
try {
  $(a);
  a = 2;
  try {
    $();
    a = 3;
  } finally {
    $(a);
    a = 4;
  }
} catch (e) {
  $(a);
  a = 5;
} finally {
  $(a);
}
$(a);
`````

## Normalized

`````js filename=intro
let a = 1;
try {
  $(a);
  a = 2;
  try {
    $();
    a = 3;
  } finally {
    $(a);
    a = 4;
  }
} catch (e) {
  $(a);
  a = 5;
} finally {
  $(a);
}
$(a);
`````

## Output

`````js filename=intro
let a = 1;
try {
  $(1);
  a = 2;
  try {
    $();
    a = 3;
  } finally {
    $(a);
    a = 4;
  }
} catch (e) {
  $(a);
  a = 5;
} finally {
  $(a);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
try {
  $( 1 );
  a = 2;
  try {
    $();
    a = 3;
  }
finally {
    $( a );
    a = 4;
  }
}
catch (e) {
  $( a );
  a = 5;
}
finally {
  $( a );
}
$( a );
`````

## Globals

BAD@! Found 1 implicit global bindings:

e

## Result

Should call `$` with:
 - 1: 1
 - 2: 
 - 3: 3
 - 4: 4
 - 5: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
