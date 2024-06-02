# Preval test case

# infinite_loops.md

> Tofix > Infinite loops
>
> If a loop has no break, continue, throw, or return then it is an infinite loop... Is that relevant? DCE the tail, for example.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while (true) { // infinite
  while (true) {
    if ($) {
      $(x);
    } else {
      $(x);
      x = 2;
      break;
    }
  }
}
$(x);



// SSA
{
  let x = 1;
  function $continue1(x) {
    function $continue2(x) {
      if ($) {
        $(x); // Can still see 2 due to outer loop
      } else {
        $(x);
        x = 2;
        $break2(x);
        return;
      }
      $continue2(x);
      return;
    }
    function $break2(x) {
      $continue1(x);
      return;
    }
    $continue2(x);
    return;
  }
  function $break1() {
    $(x);
  }
  $continue1(x);
}


// Reduction
{
  function $continue2(x) {
    if ($) {
      $(x); // Can still see 2 due to outer loop
      $continue2(x);
    } else {
      $(x);
      $continue2(2);
    }
  }
  $continue2(1);
}

// Recompile
{
  let x = 1;
  while (true) {
    if ($) {
      $(x); // Can still see 2 due to outer loop
    } else {
      $(x);
      x = 2;
    }
  }
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
while (true) {
  /*8*/ while (true) {
    /*11*/ if ($) {
      /*14*/ $(x___18__);
    } /*19*/ else {
      $(x___23__);
      x___27__ = 2;
      break;
    }
  }
}
$(x___32__);
let $continue1___35__ = function ($$0) {
  let x$3___42__ = $$0;
  debugger;
  let $break2___49__ = function ($$0) {
    let x$7___56__ = $$0;
    debugger;
    $continue1___63__(x$7___64__);
    return undefined___67__;
  };
  let $continue2___70__ = function ($$0) {
    let x$5___77__ = $$0;
    debugger;
    if ($) {
      /*84*/ $(x$5___88__);
      $continue2___91__(x$5___92__);
      return undefined___95__;
    } /*96*/ else {
      $(x$5___100__);
      x$5___104__ = 2;
      $break2___107__(x$5___108__);
      return undefined___110__;
    }
  };
  $continue2___113__(x$3___114__);
  return undefined___117__;
};
let $break1___120__ = function () {
  debugger;
  $(x$1___127__);
  return undefined___130__;
};
let x$1___133__ = 1;
$continue1___137__(x$1___138__);
let $continue2$1___141__ = function ($$0) {
  let x$9___148__ = $$0;
  debugger;
  if ($) {
    /*155*/ $(x$9___159__);
    $continue2$1___162__(x$9___163__);
    return undefined___166__;
  } /*167*/ else {
    $(x$9___171__);
    $continue2$1___174__(2);
    return undefined___177__;
  }
};
$continue2$1___180__(1);
let x$11___184__ = 1;
while (true) {
  /*188*/ if ($) {
    /*191*/ $(x$11___195__);
  } /*196*/ else {
    $(x$11___200__);
    x$11___204__ = 2;
  }
}
`````

Ref tracking result:

                 | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 18,23       | none           | 27
  - r @18      | 4,27
  - r @23      | 4,27
  - w @27      | ########## | 18,23       | 4,27           | 27
  - r @32      | none (unreachable?)

$continue1:
  - w @35      | ########## | 63,137      | none           | none
  - r @63      | 35
  - r @137     | 35

x$3:
  - w @42      | ########## | 114         | none           | none
  - r @114     | 42

$break2:
  - w @49      | ########## | 107         | none           | none
  - r @107     | 49

x$7:
  - w @56      | ########## | 64          | none           | none
  - r @64      | 56

$continue2:
  - w @70      | ########## | 91,113      | none           | none
  - r @91      | 70
  - r @113     | 70

x$5:
  - w @77      | ########## | 88,92,100   | none           | 104
  - r @88      | 77
  - r @92      | 77
  - r @100     | 77
  - w @104     | ########## | 108         | 77             | none
  - r @108     | 104

$break1:
  - w @120     | ########## | not read    | none           | none

x$1:
  - r @127     | none (unreachable?)
  - w @133     | ########## | 138         | none           | none
  - r @138     | 133

$continue2$1:
  - w @141       | ########## | 162,174,180 | none           | none
  - r @162       | 141
  - r @174       | 141
  - r @180       | 141

x$9:
  - w @148       | ########## | 159,163,171 | none           | none
  - r @159       | 148
  - r @163       | 148
  - r @171       | 148

x$11:
  - w @184       | ########## | 195,200     | none           | 204
  - r @195       | 184,204
  - r @200       | 184,204
  - w @204       | ########## | 195,200     | 184,204        | 204
