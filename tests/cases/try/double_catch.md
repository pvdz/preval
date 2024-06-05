# Preval test case

# double_catch.md

> Try > Double catch
>
> Nested empty catches can be squashed

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
  if ($) {
    throw `pass`;
  } else {
    $(`fail`);
  }
} catch (e) {}
`````

## Output

`````js filename=intro
try {
  if ($) {
    throw `pass`;
  } else {
    $(`fail`);
  }
} catch (e) {}
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

}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
