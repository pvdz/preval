# Preval test case

# double_catch.md

> Tofix > Double catch
>
> Nested empty catches can be squashed
> Probably more aggressively but let's start with this.

#TODO

## Input

`````js filename=intro
try {
  try {
    if ($) {
      throw 'pass';
    }
    $('fail');
  } catch (e) {
    
  }
} catch (e) {
  $('fail');
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
  } catch (e) {}
} catch (e$1) {
  $(`fail`);
}
`````

## Normalized

`````js filename=intro
try {
  try {
    if ($) {
      throw `pass`;
    } else {
      $(`fail`);
    }
  } catch (e) {}
} catch (e$1) {
  $(`fail`);
}
`````

## Output

`````js filename=intro
try {
  try {
    if ($) {
      throw `pass`;
    } else {
      $(`fail`);
    }
  } catch (e) {}
} catch (e$1) {
  $(`fail`);
}
`````

## PST Output

With rename=true

`````js filename=intro
try {
  try {
    if ($) {
      throw "pass";
    }
    else {
      $( "fail" );
    }
  }
catch (e) {

  }
}
catch (e$1) {
  $( "fail" );
}
`````

## Globals

BAD@! Found 2 implicit global bindings:

e, e$1

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
