# Preval test case

# try_finally_func.md

> Try > Finally > Try finally func
>
> Finally transform checks

#TODO

## Input

`````js filename=intro
try {
  
} finally {
  function f() {
    let x = 1;
    try {
      if ($()) {
        x = 2;
        return 100;
      }
    } finally {
      $(x); // can see 1 2
    }
  }
  $(f);
}
`````

## Pre Normal

`````js filename=intro
try {
} finally {
  let f = function () {
    debugger;
    let x = 1;
    try {
      if ($()) {
        x = 2;
        return 100;
      }
    } finally {
      $(x);
    }
  };
  $(f);
}
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let x = 1;
  try {
    const tmpIfTest = $();
    if (tmpIfTest) {
      x = 2;
      return 100;
    } else {
    }
  } finally {
    $(x);
  }
  return undefined;
};
$(f);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  let x = 1;
  try {
    const tmpIfTest = $();
    if (tmpIfTest) {
      x = 2;
      return 100;
    } else {
    }
  } finally {
    $(x);
  }
  return undefined;
};
$(f);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  let b = 1;
  try {
    const c = $();
    if (c) {
      b = 2;
      return 100;
    }
  }
finally {
    $( b );
  }
  return undefined;
};
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
