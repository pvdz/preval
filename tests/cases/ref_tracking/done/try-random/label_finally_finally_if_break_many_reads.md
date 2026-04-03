# Preval test case

# label_finally_finally_if_break_many_reads.md

> Ref tracking > Done > Try-random > Label finally finally if break many reads
> 
> A break that travels through two finally nodes before reaching its label.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
back: {
  try {
    $('try1', x);          // x=1
    x = 2;
  } finally {
    $('final1', x);        // x=1 2
    x = 3;
    try {
      $('try2', x);        // x=3
      x = 4;
      if ($1) {
        $('if', x);        // x=4
        x = 5;
        break back;
      }
      $('post-if', x);     // x=4
      x = 6;
    } finally {
      $('final2', x);      // x=3 4 5 6
      x = 7;
    }
    $('post-final2', x);   // x=7
    x = 8;
  }
  $('post-final1', x);     // x=8
  x = 9;
}
$('end', x);               // x=7 9
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ /*___7__*/ back: /*8~169*/ {
  /* stmt(14): */ let /*___15__*/ $implicitThrow$1 = false;
  /* stmt(17): */ let /*___18__*/ $finalCatchArg$1 = /*___19__*/ undefined;
  /* stmt(20): */ try /*21~31*/ {
    /* stmt(22): */ $(`try1`, /*___27__*/ x);
    /* stmt(28): */ /*___31__*/ x = 2;
  } catch (/*___33__*/ $finalImplicit$1) /*34~42*/ {
    /* stmt(35): */ /*___38__*/ $implicitThrow$1 = true;
    /* stmt(39): */ /*___42__*/ $finalCatchArg$1 = /*___41__*/ $finalImplicit$1;
  }
  /* stmt(43): */ $(`final1`, /*___48__*/ x);
  /* stmt(49): */ /*___52__*/ x = 3;
  /* stmt(53): */ let /*___54__*/ $implicitThrow = false;
  /* stmt(56): */ let /*___57__*/ $finalStep = false;
  /* stmt(59): */ let /*___60__*/ $finalCatchArg = /*___61__*/ undefined;
  /* stmt(62): */ /*___63__*/ $finally: /*64~121*/ {
    /* stmt(65): */ try /*66~106*/ {
      /* stmt(67): */ $(`try2`, /*___72__*/ x);
      /* stmt(73): */ /*___76__*/ x = 4;
      /* stmt(77): */ if ($1) {
        /*79~95*/ /* stmt(80): */ $(`if`, /*___85__*/ x);
        /* stmt(86): */ /*___89__*/ x = 5;
        /* stmt(90): */ /*___93__*/ $finalStep = true;
        /* stmt(94): */ break /*___95__*/ $finally;
      } /*96~106*/ else {
        /* stmt(97): */ $(`post-if`, /*___102__*/ x);
        /* stmt(103): */ /*___106__*/ x = 6;
      }
    } catch (/*___108__*/ $finalImplicit) /*109~121*/ {
      /* stmt(110): */ $(`final2`, /*___115__*/ x);
      /* stmt(116): */ /*___119__*/ x = 7;
      /* stmt(120): */ throw /*___121__*/ $finalImplicit;
    }
  }
  /* stmt(122): */ $(`final2`, /*___127__*/ x);
  /* stmt(128): */ /*___131__*/ x = 7;
  /* stmt(132): */ if (/*___133__*/ $implicitThrow) {
    /*134~136*/ /* stmt(135): */ throw /*___136__*/ $finalCatchArg;
  } /*137~169*/ else {
    /* stmt(138): */ if (/*___139__*/ $finalStep) {
      /*140~142*/ /* stmt(141): */ break /*___142__*/ back;
    } /*143~169*/ else {
      /* stmt(144): */ $(`post-final2`, /*___149__*/ x);
      /* stmt(150): */ /*___153__*/ x = 8;
      /* stmt(154): */ if (/*___155__*/ $implicitThrow$1) {
        /*156~158*/ /* stmt(157): */ throw /*___158__*/ $finalCatchArg$1;
      } /*159~169*/ else {
        /* stmt(160): */ $(`post-final1`, /*___165__*/ x);
        /* stmt(166): */ /*___169__*/ x = 9;
      }
    }
  }
}
/* stmt(170): */ $(`end`, /*___175__*/ x);
`````


## Todos triggered


None


## Ref tracking result


                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 27,48       | none           | 31,52
  - r @27      | 4
  - w @31      | ########## | 48          | 4              | 52
  - r @48      | 4,31
  - w @52      | ########## | 72,115      | 4,31           | 76,119
  - r @72      | 52
  - w @76      | ########## | 85,102,115  | 52             | 89,106,119
  - r @85      | 76
  - w @89      | ########## | 115,127     | 76             | 119,131
  - r @102     | 76
  - w @106     | ########## | 115,127     | 76             | 119,131
  - r @115     | 52,76,89,106
  - w @119     | ########## | not read    | 52,76,89,106   | none
  - r @127     | 89,106
  - w @131     | ########## | 149,175     | 89,106         | 153
  - r @149     | 131
  - w @153     | ########## | 165         | 131            | 169
  - r @165     | 153
  - w @169     | ########## | 175         | 153            | none
  - r @175     | 131,169

$implicitThrow$1:
  - w @15            | ########## | 155         | none           | 38
  - w @38            | ########## | 155         | 15             | none
  - r @155           | 15,38

$finalCatchArg$1:
  - w @18            | ########## | 158         | none           | 42
  - w @42            | ########## | 158         | 18             | none
  - r @158           | 18,42

$finalImplicit$1:
  - w @33            | ########## | 41          | none           | none
  - r @41            | 33

$implicitThrow:
  - w @54            | ########## | 133         | none           | none
  - r @133           | 54

$finalStep:
  - w @57            | ########## | 139         | none           | 93
  - w @93            | ########## | 139         | 57             | none
  - r @139           | 57,93

$finalCatchArg:
  - w @60            | ########## | 136         | none           | none
  - r @136           | 60

$finalImplicit:
  - w @108           | ########## | 121         | none           | none
  - r @121           | 108
