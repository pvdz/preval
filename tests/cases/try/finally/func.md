# Preval test case

# func.md

> Try > Finally > Func
>
> Finally transform checks

#TODO

## Input

`````js filename=intro
try {
  $(1);
  const f = function() {
    throw 'test';
  }
  $(f);
} finally {
  $(2);
}
`````

## Pre Normal

`````js filename=intro
try {
  $(1);
  const f = function () {
    debugger;
    throw `test`;
  };
  $(f);
} finally {
  $(2);
}
`````

## Normalized

`````js filename=intro
try {
  $(1);
  const f = function () {
    debugger;
    throw `test`;
  };
  $(f);
} finally {
  $(2);
}
`````

## Output

`````js filename=intro
try {
  $(1);
  const f = function () {
    debugger;
    throw `test`;
  };
  $(f);
} finally {
  $(2);
}
`````

## PST Output

With rename=true

`````js filename=intro
try {
  $( 1 );
  const a = function() {
    debugger;
    throw "test";
  };
  $( a );
}
finally {
  $( 2 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: '<function>'
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
