# Preval test case

# only_used_in_inner.md

> If call if > Only used in inner
>
> This case is a slight deviation from if-call-if because the inner if-test is not used in the outer `if`. Yet, the binding was explicitly updated before the call so we can do the same thing. This is a more generic generalization of the pattern because it's about predicting the truthfullness of the test, less about how.

#TODO

## Input

`````js filename=intro
const f = function () {
  const outerTest = $(0);
  const g = function () {
    if (innerTest) {
      return undefined;
    } else {
      $(2);
      return undefined;
    }
  };
  let innerTest = undefined;
  if (outerTest) {
    innerTest = $(3);
    g();
    return undefined;
  } else {
    innerTest = false;
    g(); // This call should be inlined and replaced with $(2)
    return undefined;
  }
};
if ($) $(f());
`````

## Pre Normal

`````js filename=intro
const f = function () {
  debugger;
  const outerTest = $(0);
  const g = function () {
    debugger;
    if (innerTest) {
      return undefined;
    } else {
      $(2);
      return undefined;
    }
  };
  let innerTest = undefined;
  if (outerTest) {
    innerTest = $(3);
    g();
    return undefined;
  } else {
    innerTest = false;
    g();
    return undefined;
  }
};
if ($) $(f());
`````

## Normalized

`````js filename=intro
const f = function () {
  debugger;
  const outerTest = $(0);
  const g = function () {
    debugger;
    if (innerTest) {
      return undefined;
    } else {
      $(2);
      return undefined;
    }
  };
  let innerTest = undefined;
  if (outerTest) {
    innerTest = $(3);
    g();
    return undefined;
  } else {
    innerTest = false;
    g();
    return undefined;
  }
};
if ($) {
  const tmpCallCallee = $;
  const tmpCalleeParam = f();
  tmpCallCallee(tmpCalleeParam);
} else {
}
`````

## Output

`````js filename=intro
if ($) {
  const outerTest = $(0);
  if (outerTest) {
    const tmpClusterSSA_innerTest = $(3);
    if (tmpClusterSSA_innerTest) {
    } else {
      $(2);
    }
  } else {
    $(2);
  }
  $(undefined);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  const a = $( 0 );
  if (a) {
    const b = $( 3 );
    if (b) {

    }
    else {
      $( 2 );
    }
  }
  else {
    $( 2 );
  }
  $( undefined );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 2
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
