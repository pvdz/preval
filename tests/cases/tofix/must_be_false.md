# Preval test case

# must_be_false.md

> Tofix > Must be false
>
> New rule
> In this example, `t` always ends up as `false` by the time it's evaluated so it can be eliminated and replaced by `false`.
> This needs ref tracking
> From tests/cases/normalize/dce/break/decl_after.md

#TODO

## Input

`````js filename=intro
const tmpIfTest = $(true);
let t = true;
if (tmpIfTest) {
  const tmpIfTest$1 = $(false);
  if (tmpIfTest$1) {
    $(`fail too`);
    throw `Preval: TDZ triggered for this assignment: x = \$('fail too')`;
  } else {
    t = false;
  }
} else {
  t = false;
}
$(t);
`````

## Pre Normal

`````js filename=intro
const tmpIfTest = $(true);
let t = true;
if (tmpIfTest) {
  const tmpIfTest$1 = $(false);
  if (tmpIfTest$1) {
    $(`fail too`);
    throw `Preval: TDZ triggered for this assignment: x = \$('fail too')`;
  } else {
    t = false;
  }
} else {
  t = false;
}
$(t);
`````

## Normalized

`````js filename=intro
const tmpIfTest = $(true);
let t = true;
if (tmpIfTest) {
  const tmpIfTest$1 = $(false);
  if (tmpIfTest$1) {
    $(`fail too`);
    throw `Preval: TDZ triggered for this assignment: x = \$('fail too')`;
  } else {
    t = false;
  }
} else {
  t = false;
}
$(t);
`````

## Output

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  const tmpIfTest$1 = $(false);
  if (tmpIfTest$1) {
    $(`fail too`);
    throw `Preval: TDZ triggered for this assignment: x = \$('fail too')`;
  } else {
  }
} else {
}
$(false);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = $( false );
  if (b) {
    $( "fail too" );
    throw "Preval: TDZ triggered for this assignment: x = $('fail too')";
  }
}
$( false );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: false
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
