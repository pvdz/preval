# Preval test case

# early_return4.md

> Normalize > Switch > Early return4
>
> Sorting out the branching stuff

(This is the intermediate step without if-else branch reduction + regression shortening)

#TODO

## Input

`````js filename=intro
let f = function () {
  const tmpIfTest = 0;
  if (tmpIfTest) {
    $('a')
  } else {
    const tmpIfTest$1 = 1;
    if (tmpIfTest$1) {
      $('b')
    } else {
      const tmpIfTest$2 = 2;
      if (tmpIfTest$2) {
        $('c')
      }
    }
    $('after inner');
  }
  $('after outer');
};
f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = 0;
  if (tmpIfTest) {
    $('a');
  } else {
    const tmpIfTest$1 = 1;
    if (tmpIfTest$1) {
      $('b');
    } else {
      const tmpIfTest$2 = 2;
      if (tmpIfTest$2) {
        $('c');
      }
    }
    $('after inner');
  }
  $('after outer');
};
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = 0;
  const tmpBranchingA = function ($$0) {
    let tmpIfTest$3 = $$0;
    debugger;
    $('a');
    const tmpReturnArg = tmpBranchingC(tmpIfTest$3);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0) {
    let tmpIfTest$5 = $$0;
    debugger;
    const tmpIfTest$7 = 1;
    const tmpBranchingA$1 = function ($$0, $$1) {
      let tmpIfTest$13 = $$0;
      let tmpIfTest$15 = $$1;
      debugger;
      $('b');
      const tmpReturnArg$1 = tmpBranchingC$1(tmpIfTest$13, tmpIfTest$15);
      return tmpReturnArg$1;
    };
    const tmpBranchingB$1 = function ($$0, $$1) {
      let tmpIfTest$17 = $$0;
      let tmpIfTest$19 = $$1;
      debugger;
      const tmpIfTest$21 = 2;
      const tmpBranchingA$3 = function ($$0, $$1, $$2) {
        let tmpIfTest$27 = $$0;
        let tmpIfTest$29 = $$1;
        let tmpIfTest$31 = $$2;
        debugger;
        $('c');
        const tmpReturnArg$3 = tmpBranchingC$3(tmpIfTest$27, tmpIfTest$29, tmpIfTest$31);
        return tmpReturnArg$3;
      };
      const tmpBranchingB$3 = function ($$0, $$1, $$2) {
        let tmpIfTest$33 = $$0;
        let tmpIfTest$35 = $$1;
        let tmpIfTest$37 = $$2;
        debugger;
        const tmpReturnArg$5 = tmpBranchingC$3(tmpIfTest$33, tmpIfTest$35, tmpIfTest$37);
        return tmpReturnArg$5;
      };
      const tmpBranchingC$3 = function ($$0, $$1, $$2) {
        let tmpIfTest$39 = $$0;
        let tmpIfTest$41 = $$1;
        let tmpIfTest$43 = $$2;
        debugger;
        const tmpReturnArg$7 = tmpBranchingC$1(tmpIfTest$39, tmpIfTest$41);
        return tmpReturnArg$7;
      };
      if (tmpIfTest$21) {
        const tmpReturnArg$9 = tmpBranchingA$3(tmpIfTest$17, tmpIfTest$19, tmpIfTest$21);
        return tmpReturnArg$9;
      } else {
        const tmpReturnArg$11 = tmpBranchingB$3(tmpIfTest$17, tmpIfTest$19, tmpIfTest$21);
        return tmpReturnArg$11;
      }
    };
    const tmpBranchingC$1 = function ($$0, $$1) {
      let tmpIfTest$23 = $$0;
      let tmpIfTest$25 = $$1;
      debugger;
      $('after inner');
      const tmpReturnArg$13 = tmpBranchingC(tmpIfTest$23);
      return tmpReturnArg$13;
    };
    if (tmpIfTest$7) {
      const tmpReturnArg$15 = tmpBranchingA$1(tmpIfTest$5, tmpIfTest$7);
      return tmpReturnArg$15;
    } else {
      const tmpReturnArg$17 = tmpBranchingB$1(tmpIfTest$5, tmpIfTest$7);
      return tmpReturnArg$17;
    }
  };
  const tmpBranchingC = function ($$0) {
    let tmpIfTest$11 = $$0;
    debugger;
    $('after outer');
  };
  if (tmpIfTest) {
    const tmpReturnArg$19 = tmpBranchingA(tmpIfTest);
    return tmpReturnArg$19;
  } else {
    const tmpReturnArg$21 = tmpBranchingB(tmpIfTest);
    return tmpReturnArg$21;
  }
};
f();
`````

## Output

`````js filename=intro
$('b');
$('after inner');
$('after outer');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'b'
 - 2: 'after inner'
 - 3: 'after outer'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
