# Preval test case

# double_catch_with_body.md

> Try > Double catch with body
>
> Nested catches can be squashed

## Input

`````js filename=intro
try {
  try {
    if ($) {
      throw 'pass';
    }
    $('fail');
  } catch (e) {
    $('inner');
  }
} catch (e) {
  $('outer');
}
`````

## Pre Normal

`````js filename=intro
try {
  try {
    if ($) {
      throw `pass`;
    }
    $(`fail`);
  } catch (e) {
    $(`inner`);
  }
} catch (e$1) {
  $(`outer`);
}
`````

## Normalized

`````js filename=intro
try {
  if ($) {
    throw `pass`;
  } else {
    $(`fail`);
  }
} catch (e) {
  try {
    $(`inner`);
  } catch (e$1) {
    $(`outer`);
  }
}
`````

## Output

`````js filename=intro
try {
  if ($) {
    throw `pass`;
  } else {
    $(`fail`);
  }
} catch (e) {
  try {
    $(`inner`);
  } catch (e$1) {
    $(`outer`);
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
try {
  if ($) {
    throw "pass";
  }
  else {
    $( "fail" );
  }
}
catch (a) {
  try {
    $( "inner" );
  }
catch (b) {
    $( "outer" );
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'inner'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
