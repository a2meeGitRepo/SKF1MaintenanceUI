/**
 * Dattatray Bodhale
	10-Jul-2021
 */
package com.maintenanceUI;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;


/**
 * @author Dattatray Bodhale
 *
 */

@Controller
public class LiveCricketController {
    
    @Autowired
    private LiveScoreService service;
    
    @MessageMapping("/score")
    @SendTo("/topic/myscores")
    public List<Batsman> getScores() {
        
        List<Batsman> scoresList = service.getScore();
        
        return scoresList;
    }
}


