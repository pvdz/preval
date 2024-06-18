# Preval test case

# sub_closure.md

> Ssa > Sub closure
>
> A binding that is otherwise only used in a future function and a nested function of that function

## Input

`````js filename=intro
const parseUnicodeQuadEscape = function (a$7, noDouble) {
  const tmpBranchingC$2331 = function () {
    secondPart = tmpBinLhs$1687 | vh;
    let tmpIfTest$9053 = secondPart < 0xdc00;

    const tmpBranchingC$2333 = function () {
      if (tmpIfTest$9053) {
        const tmpReturnArg$12267 = firstPart;
        return tmpReturnArg$12267;
      } else {
        const head = firstPart;
        const tail = $(secondPart);
        return tail;
      }
    };
    if (tmpIfTest$9053) {
      const tmpReturnArg$12271 = tmpBranchingC$2333();
      return tmpReturnArg$12271;
    } else {
      const tmpReturnArg$12263 = tmpBranchingC$2333();
      return tmpReturnArg$12263;
    }
  };

  let secondPart = undefined;
  if (tmpIfTest$9045) {
    return 1114112;
  } else {
    const tmpReturnArg$12309 = tmpBranchingC$2331();
    return tmpReturnArg$12309;
  }
};

parseUnicodeQuadEscape($(50), $(true));
`````

## Pre Normal


`````js filename=intro
const parseUnicodeQuadEscape = function ($$0, $$1) {
  let a$7 = $$0;
  let noDouble = $$1;
  debugger;
  const tmpBranchingC$2331 = function () {
    debugger;
    secondPart = tmpBinLhs$1687 | vh;
    let tmpIfTest$9053 = secondPart < 56320;
    const tmpBranchingC$2333 = function () {
      debugger;
      if (tmpIfTest$9053) {
        const tmpReturnArg$12267 = firstPart;
        return tmpReturnArg$12267;
      } else {
        const head = firstPart;
        const tail = $(secondPart);
        return tail;
      }
    };
    if (tmpIfTest$9053) {
      const tmpReturnArg$12271 = tmpBranchingC$2333();
      return tmpReturnArg$12271;
    } else {
      const tmpReturnArg$12263 = tmpBranchingC$2333();
      return tmpReturnArg$12263;
    }
  };
  let secondPart = undefined;
  if (tmpIfTest$9045) {
    return 1114112;
  } else {
    const tmpReturnArg$12309 = tmpBranchingC$2331();
    return tmpReturnArg$12309;
  }
};
parseUnicodeQuadEscape($(50), $(true));
`````

## Normalized


`````js filename=intro
const parseUnicodeQuadEscape = function ($$0, $$1) {
  let a$7 = $$0;
  let noDouble = $$1;
  debugger;
  const tmpBranchingC$2331 = function () {
    debugger;
    secondPart = tmpBinLhs$1687 | vh;
    let tmpIfTest$9053 = secondPart < 56320;
    const tmpBranchingC$2333 = function () {
      debugger;
      if (tmpIfTest$9053) {
        return firstPart;
      } else {
        const head = firstPart;
        const tail = $(secondPart);
        return tail;
      }
    };
    if (tmpIfTest$9053) {
      const tmpReturnArg$12271 = tmpBranchingC$2333();
      return tmpReturnArg$12271;
    } else {
      const tmpReturnArg$12263 = tmpBranchingC$2333();
      return tmpReturnArg$12263;
    }
  };
  let secondPart = undefined;
  if (tmpIfTest$9045) {
    return 1114112;
  } else {
    const tmpReturnArg$12309 = tmpBranchingC$2331();
    return tmpReturnArg$12309;
  }
};
const tmpCallCallee = parseUnicodeQuadEscape;
const tmpCalleeParam = $(50);
const tmpCalleeParam$1 = $(true);
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
`````

## Output


`````js filename=intro
$(50);
$(true);
if (tmpIfTest$9045) {
} else {
  const tmpClusterSSA_secondPart = tmpBinLhs$1687 | vh;
  firstPart;
  const tmpIfTest$9053 = tmpClusterSSA_secondPart < 56320;
  if (tmpIfTest$9053) {
  } else {
    $(tmpClusterSSA_secondPart);
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
$( 50 );
$( true );
if (tmpIfTest$9045) {

}
else {
  const a = tmpBinLhs$1687 | vh;
  firstPart;
  const b = a < 56320;
  if (b) {

  }
  else {
    $( a );
  }
}
`````

## Globals

BAD@! Found 4 implicit global bindings:

tmpIfTest$9045, tmpBinLhs$1687, vh, firstPart

## Result

Should call `$` with:
 - 1: 50
 - 2: true
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
